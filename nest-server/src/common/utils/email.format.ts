export const emailFormat = (title: string, content: string, link: string) => {
  return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <title>Email from WhaleChat</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1,
                h2 {
                    text-align: center;
                }
                p {
                    margin-bottom: 20px;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background: #333;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img
                    src="http://localhost:2411/storage/default/logo.png"
                    alt="Logo"
                    style="display: block; margin: 0 auto; width: 16%; height: 16%;"
                />
                <h1 style="font-size: 25px;">${title}</h1>
                <p>Dear Guy,</p>
                <p>${content}</p>
                <p style="display: block; width: 100%;">
                    <a href="${link}" class="btn" style="text-transform: uppercase; display: block; width: max-content; margin: 0 auto;">Click here</a>
                </p>
                <p>Best Regards,<br />Quan Phat</p>
            </div>
        </body>
    </html>
    
    
    `;
};
