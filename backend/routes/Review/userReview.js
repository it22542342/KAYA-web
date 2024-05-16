const express = require('express');
const router = express.Router();
const UserReview = require('../../model/Review/userReview');


router.post("/addfeedback", (req, res) => {
    const { email, fbtitle, fbdescription, rating, img } = req.body;

    console.log("Received feedback data:", req.body); 

    
    if (!email || !fbtitle || !fbdescription || !rating) {
        return res.status(400).json({ error: "Email, title, description, and rating are required" });
    }

    
    const newReview = new UserReview({ 
        email,
        fbtitle,
        fbdescription,
        rating,
        img
    });

    
    newReview.save()
        .then(() => {
            console.log("Review added successfully"); // Added for debugging
            res.json("Review Added");
        })
        .catch((err) => {
            console.error("Error adding review:", err); // Added for debugging
            res.status(500).json({ error: "Failed to add review" });
        });
});

router.get("/", (req, res) => {
    UserReview.find() 
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            console.error("Error fetching reviews:", err);
            res.status(500).json({ error: "Failed to fetch reviews" });
        });
});


router.get("/:id", async (req, res) => {
    try {
        const reviews = await reviews.findById(req.params.id);
        if (!reviews) {
            return res.status(404).json({ message: "Tour package not found" });
        }
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { fbtitle, fbdescription, rating } = req.body;


        if (!fbtitle || !fbdescription || !rating) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const updateReview = {
            fbtitle,
            fbdescription,
            rating
        };

        const updatedReview = await UserReview.findByIdAndUpdate(id, updateReview, { new: true });

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (err) {
        console.error("Error updating review:", err);
        res.status(500).json({ error: "Internal server error", message: err.message });
    }
});


router.route("/admin").get((req, res) => {
    UserReview.find() 
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            console.error("Error fetching UserReviews:", err);
            res.status(500).json({ error: "Failed to fetch UserReviews" });
        });
});

router.route("/deletefeedback/:id").delete(async (req, res) => {
    const feedbackId = req.params.id; 

    try {
        
        await UserReview.findByIdAndDelete(feedbackId); 
        res.status(200).json({ status: "UserReview deleted" });
    } catch (err) {
        console.error("Error deleting UserReview:", err);
        res.status(500).json({ error: "Failed to delete UserReview" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const reviewId = req.params.id; 

    try {
        
        await UserReview.findByIdAndDelete(reviewId); 
        res.status(200).json({ status: "Review deleted" });
    } catch (err) {
        console.error("Error deleting review:", err);
        res.status(500).json({ error: "Failed to delete review" });
    }
});


router.get('/by-email/:email', async (req, res) => {
    const email = req.params.email;
  
    try {
      const reviews = await UserReview.find({ email });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews by email:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });
module.exports = router;