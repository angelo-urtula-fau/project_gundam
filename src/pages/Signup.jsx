import { useState } from "react"
import { supabase } from "../client"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })
        if (error) {
            console.error("Error signing up:", error)
        } else {
            console.log("User signed up:", data)
            navigate("/login")
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp} className="signup-form">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp