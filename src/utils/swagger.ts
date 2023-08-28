import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Request, Response, NextFunction } from "express";


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "oAuth API Docs",
      description: "oAuthentication 2.0 API ",
      version: "1.0.0"
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "production server"
      },
      {
        url: "http://localhost:4500", 
        description: "development server"
      },
    ],
    security: [
      {
        bearerAuth:[]
      }
    ]
  },

  // looks for configuration in specified directories
  apis: ["../../dist/routes/*.js"]
};


export const swaggerSpec = swaggerJsdoc(options);


export const swaggerDocs =  (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
    
  } catch (error) {
   
    next(error);
  }
 
  }




