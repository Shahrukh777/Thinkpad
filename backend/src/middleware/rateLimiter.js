import { ratelimit } from "../config/upstash.js";

export const ratelimiter = async (req, res, next) => {
  try {
    // change later to req.user.id after authentication implementation
    // using req.ip for testing purpose [ this pc only ]
    const { success } = await ratelimit.limit(req.ip);
    if (success) {
      next(); // Allow the request to proceed
    } else {
      res.status(429).json({ message: "Too Many Requests" });
    }
  } catch (error) {
    console.error("Rate Limiter Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
