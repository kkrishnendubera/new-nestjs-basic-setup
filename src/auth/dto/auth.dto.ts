import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsString } from "class-validator";

export class RefreshJwtDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Access token to reach private urls' })
    accessToken: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Token to refresh whole pair' })
    refreshToken: string;
}

 
