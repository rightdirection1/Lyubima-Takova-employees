import { calculateDaysWorked } from "./calculateDaysWorked";
import { dateFormatOptions } from "./dateFormats";
import { parseDate } from "./parseDate";

export function buildEmployeeProjects(csvData) {
  const employeeProjects = new Map();

  csvData.forEach((row) => {
    const employeeId = row["EmployeeID"];
    const projectID = row["ProjectID"];
    const dateFrom = parseDate(row["DateFrom"], dateFormatOptions) || new Date(0);
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

  for (const [employeeId1, projects1] of employeeProjects) {
    for (const [employeeId2, projects2] of employeeProjects) {
      if (employeeId1 !== employeeId2) {
        for (const project1 of projects1) {
          for (const project2 of projects2) {
            if (project1.projectID === project2.projectID) {
              const overlapStart = new Date(
                Math.max(project1.dateFrom, project2.dateFrom)
              );
              const overlapEnd = new Date(
                Math.min(project1.dateTo, project2.dateTo)
              );

              if (overlapStart <= overlapEnd) {
                const overlap = calculateDaysWorked(overlapStart, overlapEnd);
                if (overlap > maxDaysWorked) {
                  maxDaysWorked = overlap;
                  bestPair = {
                    firstEmployeeId: employeeId1,
                    secondEmployeeId: employeeId2,
                    Project: project1.projectID,
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
