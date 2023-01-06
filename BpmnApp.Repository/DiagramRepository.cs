﻿using BmpmnApp.ApiContract.Requests;
using BpmnApp.DataAccess.Ef.Models;
using BpmnApp.Domain.Constants;
using BpmnApp.Domain.Dependencies;
using BpmnApp.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BpmnApp.Repository
{
    public class DiagramRepository : IDiagramRepository
    {
        private readonly DiagramAppDBContext context;
        public DiagramRepository(DiagramAppDBContext diaContext)
        {
            context = diaContext;
        }

        public async Task<string> CreateSubProcess(CreateSubProcessRequest request)
        {
            Diagram diagram = new Diagram
            {
                DiagramId = Guid.NewGuid(),
                DiagramProcessName = "",
                CreatedDate = DateTime.UtcNow,
                DiagramXml = Const.DefaultDiagramXml,
                UserCreatorId = new Guid("4C652D97-7C32-4008-9762-48C04D73B7C1")
            };

            SubProcessDiagram subProcess = new SubProcessDiagram
            {
                SubProcessDiagramId = diagram.DiagramId,
                ParentDiagramId = request.ParentDiagramId,
                ParentElementName = request.TaskId,
                UserCreatorId = new Guid("4C652D97-7C32-4008-9762-48C04D73B7C1"),
                CreatedDate = diagram.CreatedDate,
                DiagramXml = diagram.DiagramXml
            };
            context.AddRange(diagram, subProcess);
            await context.SaveChangesAsync();

            return diagram.DiagramId.ToString();
        }



        public async Task<DiagramModel> GetDiagramXml(Guid diagramId)
        {
            var di = await context.Diagram.Where(d => d.DiagramId == diagramId).FirstAsync();
            DiagramModel diagram = new DiagramModel { DiagramId = di.DiagramId, DiagramXml = di.DiagramXml };
            return diagram;
        }

        public async Task SaveDiagram(SaveDiagramRequest diagramRequest)
        {
            var diagram = await context.Diagram.FirstOrDefaultAsync(d => d.DiagramId == diagramRequest.DiagramId);
            diagram.DiagramXml = diagramRequest.DiagramXml;
            await context.SaveChangesAsync();
        }
    }
}
