import {createParamDecorator, ExecutionContext, InternalServerErrorException} from "@nestjs/common"

export const GetUser = createParamDecorator(
    (data:string, ctx: ExecutionContext)=>{
        console.log('user data',data)
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;
        console.log('user data',user)
        if(!user)
            throw new InternalServerErrorException('user not found')

        return (!data)?user:user[data]
    }
)