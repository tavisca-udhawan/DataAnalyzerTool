using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using CoreContracts.Models;

namespace TaviscaDataAnalyzerServiceProvider
{
    public class EmailService : IEmailService
    {
        public void generatingMail(RecipientDetails details)
        {
            string textBody = "<h2> Analysis Report of " + details.FilterName + "</h2>" +
                              "<h3> from " + details.StartDate + " upto " + details.EndDate + " at " + details.Location + "</h3>" + "<br>" +
                              " <table border=" + 1 + " cellpadding=" + 10 + " cellspacing=" + 0 + " width = " + 500 + ">" +
                              "<tr bgcolor='#D3D3D3'>" +
                              "<td><b>Lables</b></td> " +
                              "<td><b>Statistics</b></td>" +
                              "</tr>";
            for (int loopCount = 0; loopCount < details.Lables.Length; loopCount++)
            {
                textBody += "<tr>" +
                            "<td>" + details.Lables[loopCount] + "</td>" +
                            "<td> " + details.Statistics[loopCount] + "</td> " +
                            "</tr>";
            }
            textBody += "</table>";


            MailMessage mailMessage = new MailMessage("purab2018@gmail.com", details.RecipientEmialId);
            mailMessage.Subject = "Data Analysis Report";
            mailMessage.Body = textBody;
            mailMessage.IsBodyHtml = true;

            NetworkCredential credentials = new NetworkCredential();
            credentials.UserName = "purab2018@gmail.com";
            credentials.Password = "Tavisca@123";

            SmtpClient client = new SmtpClient();
            client.Host = "smtp.gmail.com";
            client.Credentials = credentials;
            client.Port = 587;
            client.EnableSsl = true;

            try
            {
                client.Send(mailMessage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
            }
        }
    }
}
