import { Router, Request, Response, NextFunction } from "express"
import { Container } from "typedi"
import controller from "../controllers/crm"
const route = Router()

export default (app: Router) => {
    app.use("/crm", route)

    route.get("/customerData/:phone", controller.getCustomerData)
    route.get("/getPopulation/:code", controller.getPopulationByCode)
    route.get("/categories", controller.getParamCategories)
    route.get("/time_units", controller.getTimeUnits)
    route.get("/action_types", controller.getActionTypes)
    route.get("/methods", controller.getMethods)
    route.get("/eventResults", controller.getEventResults)
    route.get("/getEventsByDay", controller.getEventsByDay)
    route.post("/createParam", controller.createParam)
    route.post("/createExecutionLine", controller.createAgendaExecutionLine)
    route.post("/getCustomers", controller.getCustomers)
    route.post("/createPopulation", controller.createPopulation)
    route.post("/createOneAgendaLine", controller.createOneAgendaLine)
    route.get("/getPopulations", controller.getPopulations)
    route.get("/getCRMDashboardData", controller.getCRMDashboardData)
    route.post("/createEventOrderZero", controller.createAgendaEventOrderZero)

  
}
