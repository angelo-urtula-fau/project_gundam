import { useState } from "react"
import { supabase } from "../client"
import { useNavigate } from "react-router-dom"

const UpdatePassword = () => {
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleUpdatePassword = async (e) => {
        e.preventDefault()
        const { error } = await supabase.auth.updateUser({
            password
        })
        if (error) {
            console.error("Error updating password:", error)
        } else {
            console.log("Password updated")
            navigate("/")
        }
    }

    return (
        <div>
            <h1>Update Password</h1>
            <form onSubmit={handleUpdatePassword} className="signup-form">
                <label htmlFor="password">New Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Update Password</button>
            </form>
        </div>
    )
}

export default UpdatePassword