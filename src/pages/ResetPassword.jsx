import { useState } from "react"
import { supabase } from "../client"
import { useNavigate } from "react-router-dom"


const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const handleReset = async (e) => {
        e.preventDefault()
        setMessage("")
        setError("")

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + "/update-password"
        })

        if (error) {
            setError(error.message)
            return
        }

        setMessage("Password reset email sent. Check your inbox.")
    }

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>

            <form onSubmit={handleReset}>
                <input
                    type="email"
                    placeholder="Enter your account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}

                <button type="submit">Send Reset Email</button>
            </form>
        </div>
    )

}

export default ResetPassword