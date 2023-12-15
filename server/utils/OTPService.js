import otpGenerator from 'otp-generator';
export const OtpGenerator = () => {
    const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    const otp_expiry_time = Date.now() + 5 * 60 * 1000; // 5 mins
    return { otp, otp_expiry_time };
};
