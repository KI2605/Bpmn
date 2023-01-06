using BmpmnApp.ApiContract.Requests;
using BpmnApp.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BpmnApp.Domain.Contracts
{
    public interface IDiagramService
    {
        public Task<DiagramModel> GetDiagramXml(Guid diagramId);
        public Task SaveDiagram(SaveDiagramRequest diagramRequest);

        public Task<string> CreateSubProcess(CreateSubProcessRequest request);
    }
}
