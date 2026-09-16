const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // 5 minutes baad auto-delete
    },
});

// Function to send emails
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        );

        if (mailResponse) {
            console.log("Email sent successfully:", mailResponse.messageId || mailResponse.response);
        } else {
            console.log("Failed to send verification email (mailSender returned null).");
        }
    } catch (error) {
        console.log("Error occurred while sending email:", error.message);
        throw error;
    }
}

// Pre-save hook to send email before document is saved
OTPSchema.pre("save", async function () {
    console.log("New OTP document saving to database...");

    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;