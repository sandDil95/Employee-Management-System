import {useForm} from "react-hook-form";
import {loginRequest} from "../../services/authService";
import {useAuth} from "../auth/AuthContext";
import {useNavigate, Link} from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await loginRequest(data);
            login(response.token);
            navigate("/employees");
        } catch (error) {
            alert("invalid Credentials");
        }
    }
    return (
        <div>
            <h2>User Signin</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Email" {...register("email")}/>
                <input placeholder="Password" {...register("password")}/>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register"> Register </Link></p>
        </div>
    );
}