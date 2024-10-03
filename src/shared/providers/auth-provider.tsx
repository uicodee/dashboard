// "use client"
//
// import {ReactNode, useEffect} from "react";
// import {useRouter} from "next/navigation";
// import {useRefreshTokenRefreshTokenPost} from "@/shared/api/authentication/authentication";
//
// export const AuthProvider = ({children}: { children: ReactNode }) => {
//     const router = useRouter()
//     const refreshMutation = useRefreshTokenRefreshTokenPost({
//         mutation: {
//             onSuccess: (data) => {
//                 const item = {
//                     accessToken: data.access_token,
//                     expiry: new Date().getTime() + (data.expiresAt)
//                 }
//                 localStorage.setItem("accessToken", JSON.stringify(item))
//             },
//             onError: () => {
//                 router.replace("/login")
//             }
//         }
//     })
//     useEffect(() => {
//         const accessTokenStr = localStorage.getItem('accessToken');
//         if (!accessTokenStr) {
//             refreshMutation.mutate()
//         } else {
//             try {
//                 const accessToken = JSON.parse(accessTokenStr);
//                 if (new Date().getTime() > accessToken.expiry) {
//                     refreshMutation.mutate()
//                 }
//             } catch {
//                 router.replace("/login")
//             }
//         }
//     }, [router]);
//
//     return <>{children}</>
// }