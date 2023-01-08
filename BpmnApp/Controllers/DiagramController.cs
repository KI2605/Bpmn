using BmpmnApp.ApiContract.Requests;
using BmpmnApp.ApiContract.Responses;
using BpmnApp.Domain.Contracts;
using BpmnApp.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BpmnApp.Controllers
{
    [Route("api/diagram")]
    [ApiController]
    public class DiagramController : ControllerBase
    {
        private readonly IDiagramService diagramService;
        public DiagramController(IDiagramService _diagramService)
        {
            diagramService = _diagramService;
        }

        [Route("get/{diagramId}")]
        [HttpGet]
        public async Task<DiagramModel> GetDiagramXml(Guid diagramId)
        {
            //Guid personId = Guid.Parse("4C652D97-7C32-4008-9762-48C04D73B7C1");
            DiagramModel diagram = await diagramService.GetDiagramXml(diagramId);
            return diagram;
        }

        [HttpPost("save")]
        public async Task SaveDiagram([FromBody]SaveDiagramRequest diagramRequest)
        {
            var a = 1;
            //Guid personId = Guid.Parse("4C652D97-7C32-4008-9762-48C04D73B7C1");
            await diagramService.SaveDiagram(diagramRequest);
        }

        [HttpPost("add-subprocess")]
        public async Task<CreateSubpocessResponse> CreateSubProcess([FromBody] CreateSubProcessRequest request)
        {
            //Guid personId = Guid.Parse("4C652D97-7C32-4008-9762-48C04D73B7C1");
            var s = await diagramService.CreateSubProcess(request);
            return s;
        }

        [Route("sub-processes/{diagramId}")]
        [HttpGet]
        public async Task<List<DiagramSubprocessResponse>> GetDiagramSubprocesses(Guid diagramId)
        {
            //Guid personId = Guid.Parse("4C652D97-7C32-4008-9762-48C04D73B7C1");
            List<DiagramSubprocessResponse> result = await diagramService.GetDiagramSubprocesses(diagramId);
            return result;
        }
    }
}
