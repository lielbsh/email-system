const express = require("express");
const User = require("./models/userModel");
const Email = require("./models/emailModel");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      from: fromUserId,
      to: recipientEmails,
      subject,
      body,
      isDraft,
    } = req.body;
    const recipients = await User.find({
      emailAddress: { $in: recipientEmails },
    });

    if (recipients.length !== recipientEmails.length) {
      const foundEmails = recipients.map((user) => user.emailAddress);
      const missingEmails = recipientEmails.filter(
        (email) => !foundEmails.includes(email)
      );
      return res.status(404).json({
        error: "Some recipient emails were not found",
        missingEmails,
      });
    }

    const recipientIds = recipients.map((user) => user._id);

    const newEmail = new Email({
      from: fromUserId,
      to: recipientIds,
      subject,
      body,
      isDraft,
    });

    await newEmail.save();

    res.status(201).json({ messageId: newEmail._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/inbox", async (req, res) => {
  try {
    const userId = req.query.userId;
    const inboxEmails = await Email.find({ to: userId, isDraft: false })
      .sort({
        createdAt: -1,
      })
      .populate("from", "firstName lastName");
    res.json(inboxEmails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/outbox", async (req, res) => {
  try {
    const userId = req.query.userId;
    const emails = await Email.find({ from: userId, isDraft: false })
      .sort({
        createdAt: -1,
      })
      .populate("from", "firstName lastName");
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/drafts", async (req, res) => {
  try {
    const userId = req.query.userId;
    const emails = await Email.find({ from: userId, isDraft: true })
      .sort({
        updatedAt: -1,
      })
      .populate("from", "firstName lastName");
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const { userId, email } = req.body;
    console.log(userId);
    const existingEmail = await Email.findById(email._id);
    if (!existingEmail) {
      return res.status(404).json({ message: "Email not found." });
    }
    if (!existingEmail.from.equals(userId) || !existingEmail.isDraft) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this email." });
    }

    existingEmail.to = email.to || existingEmail.to;
    existingEmail.subject = email.subject || existingEmail.subject;
    existingEmail.body = email.body || existingEmail.body;
    existingEmail.isDraft = email.isDraft;

    const updatedEmail = await existingEmail.save();
    res.json(updatedEmail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/users", async (req, res) => {
  try {
    const ids = req.body.ids;
    const users = await User.find(
      { _id: { $in: ids } },
      "firstName lastName"
    ).lean();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { userId, search, box = "inbox" } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    let filter = { isDraft: false };

    if (box === "inbox") {
      filter.to = userId;
    } else if (box === "outbox") {
      filter.from = userId;
    } else if (box === "drafts") {
      filter.from = userId;
      filter.isDraft = true;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const emails = await Email.find(filter)
      .sort({ createdAt: -1 })
      .populate("from", "firstName lastName");

    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
