import {useForm} from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { register as registerUser } from "../../services/authService";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            await registerUser(data);
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed.");
        }
    }
    return (
        <div>
            <h2>User Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Username" {...register("username")}/>
                <input placeholder="Email" type="email" {...register("email")}/>
                <input placeholder="Password" type="password" {...register("password")}/>
                <button type="submit">Register</button>
            </form>
            <p>Already have a account? <Link to="/login"> Login </Link></p>
        </div>
    );
}