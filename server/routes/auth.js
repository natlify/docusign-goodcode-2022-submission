import express from "express"
import { supabase } from "../services/@supabase.js"

const router = express.Router()

router.post("/set-supabase-cookie", async (req, res) => {
  supabase.auth.api.setAuthCookie(req, res)
})

export { router as authRouter }
