import { calculateDaysWorked } from "./calculateDaysWorked";
import { dateFormatOptions } from "./dateFormats";
import { parseDate } from "./parseDate";

export function buildEmployeeProjects(csvData) {
  const employeeProjects = new Map();

  csvData.forEach((row) => {
    const employeeId = row["EmployeeID"];
    const projectID = row["ProjectID"];
    const dateFrom =
      parseDate(row["DateFrom"], dateFormatOptions) || new Date(0);
    const dateTo = parseDate(row["DateTo"], dateFormatOptions) || new Date();

    if (!employeeProjects.has(employeeId)) {
      employeeProjects.set(employeeId, []);
    }

    employeeProjects.get(employeeId).push({ projectID, dateFrom, dateTo });
  });

  return employeeProjects;
}

export function findLongestWorkingPair(employeeProjects) {
  let maxDaysWorked = 0;
  let bestPair = {};

  for (const [firstEmployeeId, firstEmployeeProjects] of employeeProjects) {
    for (const [secondEmployeeId, secondEmployeeProjects] of employeeProjects) {
      if (firstEmployeeId !== secondEmployeeId) {
        for (const firstProject of firstEmployeeProjects) {
          for (const secondProject of secondEmployeeProjects) {
            if (firstProject.projectID === secondProject.projectID) {
              const overlapStart = new Date(
                Math.max(firstProject.dateFrom, secondProject.dateFrom)
              );
              const overlapEnd = new Date(
                Math.min(firstProject.dateTo, secondProject.dateTo)
              );

              if (overlapStart <= overlapEnd) {
                const overlap = calculateDaysWorked(overlapStart, overlapEnd);
                if (overlap > maxDaysWorked) {
                  maxDaysWorked = overlap;
                  bestPair = {
                    firstEmployeeId: firstEmployeeId,
                    secondEmployeeId: secondEmployeeId,
                    ProjectID: firstProject.projectID,
                    LongestPeroidOfTime: maxDaysWorked,
                  };
                }
              }
            }
          }
        }
      }
    }
  }

  return bestPair;
}
