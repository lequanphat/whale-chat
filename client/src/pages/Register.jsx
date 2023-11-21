import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Register() {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('form');
    };
    const handleChange = (event) => {};
    return (
        <div>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src="" alt="" />
                        <h1>snappy</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)} />
                    <input type="text" placeholder="Email" name="email" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />

                    <button type="submit">Create User</button>
                    <span>You already have an account?</span><Link to="/login">Login</Link>
                </form>
            </FormContainer>
        </div>
    );
}

const FormContainer = styled.div``;

export default Register;
