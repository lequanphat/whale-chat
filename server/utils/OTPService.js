import otpGenerator from 'otp-generator';
export const OtpGenerator = () => {
  const verifyCode = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const verifyCodeExpiredTime = Date.now() + 5 * 60 * 1000; // 5 mins
  return { verifyCode, verifyCodeExpiredTime };
};
