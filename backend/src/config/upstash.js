import { Ratelimit } from "@upstash/ratelimit"; // for rate limiting
import { Redis } from "@upstash/redis"; // for direct redis access

import dotenv from "dotenv";
dotenv.config();

// Create a new ratelimiter, that allows 5 requests per 10 seconds
export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

// You can also access redis directly
export const redis = Redis.fromEnv();