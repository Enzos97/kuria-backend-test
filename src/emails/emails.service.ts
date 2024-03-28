import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CommonService } from 'src/common/common.service';
import { PruebaDto } from './dto/pruebaMail.dto';

@Injectable()
export class EmailsService {
  constructor(
    private mailerService: MailerService,
    private commonService: CommonService
  ) {}

  async send_register_mail(pruebaMail: PruebaDto) {
    try {
      await this.mailerService.sendMail({
        to: pruebaMail.user,
        from: `"Kiura profession" <${process.env.MAIL_FROM}>`,
        subject: 'Registro exitoso en kiura profession',
        template: './registro', 
        context: { 
          name: pruebaMail.name,
        },
      });
    } catch (error) {
      console.log('error al eviar el correo',error.message)
    }
  }
}
