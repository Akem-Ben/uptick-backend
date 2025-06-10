import { v4 } from "uuid";
import Users from "../../models/users.models";
import { helpersUtilities } from "../../utilities";
import { UserAttributes, UserRoles } from "../../types/userTypes/userTypes.types";
import usersRepositories from "../../repositories/userRepositories/users.repositories";
import { responseUtilities, errorUtilities, mailUtilities } from "../../utilities";
import { StatusCodes } from "../../responses/statusCodes/statusCodes.responses";
import { GeneralResponses } from "../../responses/generalResponses/general.responses";



const registerUserService = errorUtilities.withServiceErrorHandling(async (registerPayload: UserAttributes) => {
    const { firstName, lastName, email, password, role } = registerPayload;

    const userExists = await Users.findOne({
        where: { email },
        attributes: ['id', 'email']
    });

    if (userExists) {
        throw errorUtilities.createError(GeneralResponses.EMAIL_EXISTS_LOGIN, StatusCodes.BadRequest);
    }

    const newPassword = await helpersUtilities.hashPassword(password);

    const createUserPayload = {
        id: v4(),
        firstName,
        lastName,
        email,
        password: newPassword,
        isVerified: false,
        isActive: true,
        isBlocked: false,
        isFirstTimeLogin: true,
        role: role ?? UserRoles.USER
    }


    const newUser = await usersRepositories.create(createUserPayload)

    if (!newUser) {
        throw errorUtilities.createError(GeneralResponses.PROCESS_UNSSUCCESSFUL, StatusCodes.InternalServerError);
    }

    const tokenData = {
        data: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        },
        expires: "10min",
    };

    const token = helpersUtilities.generateToken(tokenData);
    
        const emailMessage = "Welcome to Readers Delight. Please click the link below to verify your account. It is great having you join us. We look forward to a great time with you."
    
        const actionLink = `${process.env.EMAIL_VERIFICATION_URL!}/${token}`
    
        const actionText = "Verify Account"
    
        try {
            await mailUtilities.sendMail(email, emailMessage, "Welcome to Readers Delight", actionLink, actionText);
        } catch (error: any) {
            console.error(`Error Sending Mail: ${error}`)
        }

    return responseUtilities.handleServicesResponse(StatusCodes.Created, GeneralResponses.USER_REGSTRATION_SUCCESSFUL, newUser)
});





export default {
    registerUserService
}
