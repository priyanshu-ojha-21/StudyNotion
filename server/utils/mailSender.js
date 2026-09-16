const mailSender = async (email, title, body) => {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                sender: { name: "StudyNotion", email: "ojhap259@gmail.com" },
                to: [{ email: email }],
                subject: title,
                htmlContent: body,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Mail send failed via Brevo API:", data);
            return null;
        }

        console.log("Email sent successfully via API:", data);
        return data;
    } catch (error) {
        console.log("Mail send failed:", error.message);
        return null;
    }
};

module.exports = mailSender;