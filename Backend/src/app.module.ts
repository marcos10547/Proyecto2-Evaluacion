import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { ProfesionalesModule } from "./profesionales/profesionales.module"
import { VideosModule } from "./videos/videos.module"
import { EventosModule } from "./eventos/eventos.module"
import { HabilidadesModule } from "./habilidades/habilidades.module"
import { DatabaseModule } from "./database/database.module"
import config from "./config/config"
import { validationSchema } from "./config/validate"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    DatabaseModule,
    ProfesionalesModule,
    VideosModule,
    EventosModule,
    HabilidadesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

