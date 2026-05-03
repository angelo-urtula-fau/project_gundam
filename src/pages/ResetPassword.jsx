import { useState } from "react"
import { supabase } from "../client"
import { useNavigate } from "react-router-dom"


const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const handleResetPassword = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.resetPassword({
            email
        })
        if (error) {
            console.error("Error resetting password:", error)
        } else {
            console.log("Password reset email sent")
            navigate("/login")
        }
    }

    return (
        <div>
            <h1>Reset Password</h1>
            <form onSubmit={handleResetPassword} className="signup-form">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    )
}

export default ResetPassword