import { User } from "./auth.model";

export class AuthService {
    public async FindUserByEmail(email: string) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return
            }
            return user
        } catch (error) {
            return error
        }
    }

    public async FindUserById(id: string) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return
            }
            return user
        } catch (error) {
            return error
        }
    }

    public async FindUserByEmailAndOTP(email: string, otp: string) {
        try {
            const user = await User.findOne({ email: email, otp: otp });
            if (!user) {
                return
            }
            return user
        } catch (error) {
            return error
        }
    }
}