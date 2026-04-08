document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_507ni8a", "template_h9qi88m", this)
        .then(function () {
            document.getElementById("form-status").innerText = "Message sent successfully!";
        }, function (error) {
            document.getElementById("form-status").innerText = "Failed to send message.";
            console.log("FAILED...", error);
        });

    this.reset();
});

