using EmailSending.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace EmailSending.Controllers
{
    public class EmailController : ApiController
    {
        string[] data  = { "New Delhi", "Coral Springs", "Oak Lawn", "Boynton Beach", "Garden Grove", "THANE" };
        int [] count = {1,2,3,4,5,6 };
        public void PostEmail([FromBody]RecipentsDetails details)
        {
            string textBody = " <table border=" + 1 + " cellpadding=" + 0 + " cellspacing=" + 0 + " width = " + 400 + ">" +
                              "<tr bgcolor='#4da6ff'>" +
                              "<td><b>Data</b></td> " +
                              "<td><b>Count</b></td>" +
                              "</tr>";
            for (int loopCount = 0; loopCount < data.Length; loopCount++)
            {
                textBody += "<tr>" +
                            "<td>" + data[loopCount] + "</td>" +
                            "<td> " + count[loopCount] + "</td> " +
                            "</tr>";
            }
            textBody += "</table>";


            MailMessage mailMessage = new MailMessage("deshpande.bhargavi6@gmail.com", details.RecipientEmialId);
            mailMessage.Subject = "Data Analysis Report";
            mailMessage.Body = textBody;
            //for(int index = 0; index < data.Length; index++)
            //{
            //    mailMessage.Attachments.Add(new Attachment(data[index]));
            //}

            mailMessage.IsBodyHtml = true;
            SmtpClient smtpClient = new SmtpClient();
            try
            {
                smtpClient.Send(mailMessage);
            }
            catch(Exception e)
            {
                Console.WriteLine(e.ToString());
            }
           
        }
    }
}
