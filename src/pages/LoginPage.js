import React, { useState } from "react";
import {
    Link,
    Stack,
    Alert,
    IconButton,
    InputAdornment,
    Container,
    Box,
    Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import logoImg from "../logo.png";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const defaultValues = {
    email: "",
    password: "",
    remember: true,
};

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);


    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        const from = location.state?.from?.pathname || "/";
        const { email, password } = data;
        try {
            await auth.login({ email, password }, () => {
                navigate(from, { replace: true });
            });
        } catch (error) {
            reset();
            setError("responseError", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginRight: 0,
                backgroundColor: "#008e97",
                width: "100%",
                height: "85vh"
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", }}>
                <img src={logoImg} alt="Logo" style={{ width: 120, height: 110, borderRadius: "5px" }} />
                <Typography
                    sx={{
                        color: "white",
                        fontSize: "3rem",
                        marginLeft: 1
                    }}
                >
                    Titus
                </Typography>
            </Box>

            <Container maxWidth="xs"
                sx={{
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "5px",
                    width: "30%",
                    margin: 1,
                    marginLeft: "5rem",
                }}
            >
                <Typography sx={{ marginBottom: 1, fontSize: "1.5rem" }}>Đăng nhập</Typography>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={1}>
                        {!!errors.responseError && (
                            <Alert severity="error">{errors.responseError.message}</Alert>
                        )}
                        <Alert severity="info">
                            Don’t have an account?{" "}
                            <Link color="primary" variant="subtitle2" component={RouterLink} to="/register">
                                Đăng ký
                            </Link>
                        </Alert>

                        <FTextField name="email" label="Email address" />

                        <FTextField
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    // sx={{ my: 1 }}
                    >
                        <FCheckbox name="remember" label="Remember me" />
                        <Link component={RouterLink} variant="subtitle2" to="/">
                            Forgot password?
                        </Link>
                    </Stack>

                    <LoadingButton
                        fullWidth
                        size="small"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Login
                    </LoadingButton>
                </FormProvider>
            </Container>
        </Box>
    );
}

export default LoginPage;
