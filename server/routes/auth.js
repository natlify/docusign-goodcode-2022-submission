import express from "express"
import { supabase } from "../services/@supabase.js"

const router = express.Router()

router.post("/set-supabase-cookie", async (req, res) => {
  try {
    supabase.auth.api.setAuthCookie(req, res)
  } catch (error) {
    console.log(error)
  }
})

export { router as authRouter }
