using BmpmnApp.ApiContract.Requests;
using BpmnApp.Domain.Contracts;
using BpmnApp.Domain.Dependencies;
using BpmnApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BpmnApp.Domain.Services
{
    public class DiagramService : IDiagramService
    {
        private readonly IDiagramRepository diagramRepository;
        public DiagramService(IDiagramRepository _diagramRepository)
        {
            diagramRepository = _diagramRepository;
        }

        public Task<string> CreateSubProcess(CreateSubProcessRequest request)
        {
            return diagramRepository.CreateSubProcess(request);
        }

        public Task<DiagramModel> GetDiagramXml(Guid diagramId)
        {
            return diagramRepository.GetDiagramXml(diagramId);
        }

        public Task SaveDiagram(SaveDiagramRequest diagramRequest)
        {
            return diagramRepository.SaveDiagram(diagramRequest);
        }
    }
}
