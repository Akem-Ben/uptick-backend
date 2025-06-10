import { v4 } from "uuid";
import Users from "../../models/users.models";
import { helpersUtilities } from "../../utilities";
import { UserAttributes, UserRoles } from "../../types/userTypes/userTypes.types";
import usersRepositories from "../../repositories/userRepositories/users.repositories";
import { responseUtilities, errorUtilities, mailUtilities } from "../../utilities";
import { StatusCodes } from "../../responses/statusCodes/statusCodes.responses";
import { GeneralResponses } from "../../responses/generalResponses/general.responses";
import userRepositories from "../../repositories/userRepositories/users.repositories";



const registerUserService = errorUtilities.withServiceErrorHandling(async (registerPayload: UserAttributes) => {
    const { firstName, lastName, email, password, role } = registerPayload;

    const userExists = await usersRepositories.getOne(
        { email },
        ['id', 'email']
    );

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
            userId: createUserPayload.id,
            email: createUserPayload.email,
            role: createUserPayload.role
        },
        expires: "10min",
    };

    const token = helpersUtilities.generateToken(tokenData);

    const emailMessage = "Welcome to Readers Delight. Please click the link below to verify your account. Link expires in ten (10) minutes. It is great having you join us. We look forward to a great time with you."

    const actionLink = `${process.env.EMAIL_VERIFICATION_URL!}/${token}`

    const actionText = "Verify Account"

    try {
        await mailUtilities.sendMail(email, emailMessage, "Welcome to Readers Delight", actionLink, actionText);
    } catch (error: any) {
        console.error(`Error Sending Mail: ${error}`)
    }

    return responseUtilities.handleServicesResponse(StatusCodes.Created, GeneralResponses.USER_REGSTRATION_SUCCESSFUL, createUserPayload.email)
});


const verifyUserAccountService = errorUtilities.withServiceErrorHandling(async (accountVerificationToken: string) => {

    const tokenValidation = helpersUtilities.validateToken(accountVerificationToken)

    const { userId } = tokenValidation as { userId: string };

    if (!userId) {
        console.error('ERROR====> USER VERIFICATION ERROR: Invalid token: Missing user ID')
        throw errorUtilities.createError(GeneralResponses.VERIFICATION_ERROR, StatusCodes.BadRequest);
    }

    const user = await userRepositories.getOne({ id: userId })

    if (!user) {
        throw errorUtilities.createError(GeneralResponses.USER_NOT_FOUND, StatusCodes.NotFound);
    }

    if (user.isVerified) {
        throw errorUtilities.createError(GeneralResponses.ALREADY_VERIFIED_ACCOUNT, StatusCodes.BadRequest);
    }

    await userRepositories.updateOne(
        {
            id: userId
        },
        {
            isVerified: true,
            verifiedAt: new Date()
        }
    )

    return responseUtilities.handleServicesResponse(StatusCodes.OK, GeneralResponses.SUCCESSFUL_VERIFICATION, { email: user.email, role: user.role }
    )
})





export default {
    registerUserService,
    verifyUserAccountService
}
