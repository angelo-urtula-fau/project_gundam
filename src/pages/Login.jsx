import { useState } from "react"
import { supabase } from "../client"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
            return
        }

        navigate("/")
    }
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        })
    }
    return (
        <div className="auth-container">
            <h2>Log In</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="error">{error}</p>}

                <button>
                    Log In
                </button>
            </form>

            <button onClick={handleGoogleLogin} className="google-btn">
                Log In with Google
            </button>

            <button className="link" onClick={() => navigate("/signup")}>
                Need an account? Sign up
            </button>

            <button className="link" onClick={() => navigate("/reset-password")}>
                Forgot your password
            </button>
        </div>
    )

}

export default Login