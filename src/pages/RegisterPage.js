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
    Typography,
    CardMedia
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
    userName: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirmation: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
    userName: "",
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
        const { userName, email, password } = data;
        try {
            await auth.register({ userName, email, password }, () => {
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
                flexDirection: {
                    xs: "column", md: "row"
                },
                justifyContent: {
                    xs: "flex-start", md: "center"
                },
                alignItems: "center",
                backgroundColor: "#008e97",
                width: "100%",
                height: "85vh"
            }}
        >
            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
            }}>
                <Box sx={{
                    justifyContent: "flex-start",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: { xs: "row", md: "column" },
                    margin: { xs: "5px", md: "0" },
                }}>
                    <CardMedia
                        component="img"
                        src={logoImg}
                        alt="Logo"
                        sx={{
                            width: { xs: "40px", md: "120px" },
                            height: { xs: "40px", md: "110px" },
                            borderRadius: "5px"
                        }} />
                    <Typography
                        sx={{
                            color: "white",
                            fontSize: { xs: "1.5rem", md: "2.7rem" },
                        }}
                    >
                        Titus
                    </Typography>
                </Box>
                <Container maxWidth="xs"
                    sx={{
                        margin: { xs: "5px", md: "0" },
                        marginLeft: { xs: "0", md: "20px" },
                        backgroundColor: "white",
                        borderRadius: "5px",
                        width: { xs: "300px", md: "350px" },
                    }}
                >
                    <Typography sx={{
                        fontSize: {
                            xs: "1.1rem", md: "1.5rem"
                        }
                    }}>Đăng kí</Typography>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        < Stack >
                            {!!errors.responseError && (
                                <Alert sx={{
                                    fontSize: { xs: "0.7rem", md: "0.9rem" },
                                    height: "35px",
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                }} severity="error">{errors.responseError.message.slice(0, 30)}</Alert>
                            )
                            }
                            < Alert sx={{
                                fontSize: { xs: "0.7rem", md: "0.9rem" }, height: "35px",
                                display: "flex",
                                alignItems: "center",
                                mb: 2
                            }} severity="info">
                                Bạn chưa có tài khoản?{" "}
                                <Link
                                    color="primary"
                                    variant="subtitle2"
                                    component={RouterLink}
                                    to="/login"
                                    sx={{ fontSize: { xs: "0.7rem", md: "0.9rem" } }}
                                >
                                    Đăng nhập
                                </Link>
                            </Alert>

                            <FTextField name="userName" label="UserName" />
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
                                size="mdall"
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                                sx={{ fontSize: { xs: "0.7rem", md: "1rem" }, mb: 2 }}
                            >
                                Register
                            </LoadingButton>
                        </Stack>
                    </FormProvider>
                </Container >
            </Box>
        </Box >
    );
}

export default RegisterPage;
