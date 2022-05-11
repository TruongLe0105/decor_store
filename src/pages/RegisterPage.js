import React, { useState } from "react";
import logoImg from "../logo.png";
import {
    Link,
    Stack,
    Alert,
    IconButton,
    InputAdornment,
    Container,
    Box,
    Typography
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useNavigate, Link as RouterLink } from "react-router-dom";

import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirmation: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
};

function RegisterPage() {
    const navigate = useNavigate();
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        const { name, email, password } = data;
        try {
            await auth.register({ name, email, password }, () => {
                navigate("/", { replace: true });
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <img src={logoImg} alt="Logo" style={{ width: 130, height: 120, borderRadius: "5px" }} />
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
                <Typography sx={{ marginBottom: 1, fontSize: "1.5rem" }}>Sign Up</Typography>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        {!!errors.responseError && (
                            <Alert severity="error">{errors.responseError.message}</Alert>
                        )}
                        <Alert severity="info">
                            Already have an account?{" "}
                            <Link variant="subtitle2" component={RouterLink} to="/login">
                                Sign in
                            </Link>
                        </Alert>

                        <FTextField name="name" label="UserName" />
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
                        <FTextField
                            name="passwordConfirmation"
                            label="Password Confirmation"
                            type={showPasswordConfirmation ? "text" : "password"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPasswordConfirmation(!showPasswordConfirmation)
                                            }
                                            edge="end"
                                        >
                                            {showPasswordConfirmation ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <LoadingButton
                            fullWidth
                            size="small"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Register
                        </LoadingButton>
                    </Stack>
                </FormProvider>
            </Container>
        </Box>
    );
}

export default RegisterPage;
