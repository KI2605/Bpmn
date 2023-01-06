using System;
using System.Collections.Generic;
using System.Text;

namespace BpmnApp.Domain.Constants
{
    public static class Const
    {
        public static string DefaultDiagramXml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn:definitions xmlns:bpmn=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xmlns:modeler=\"http://camunda.org/schema/modeler/1.0\" id=\"Definitions_1v80zms\" targetNamespace=\"http://bpmn.io/schema/bpmn\" exporter=\"Camunda Modeler\" exporterVersion=\"4.8.1\" modeler:executionPlatform=\"Camunda Platform\" modeler:executionPlatformVersion=\"7.15.0\">\n  <bpmn:process id=\"Process_Default\" isExecutable=\"true\">\n    <bpmn:task id=\"Activity_0r7h31h\" name=\"dd\">\n      <bpmn:outgoing>Flow_1mojh0z</bpmn:outgoing>\n    </bpmn:task>\n    <bpmn:task id=\"Activity_13x6aoj\" name=\"abcde\">\n      <bpmn:incoming>Flow_1mojh0z</bpmn:incoming>\n    </bpmn:task>\n    <bpmn:sequenceFlow id=\"Flow_1mojh0z\" sourceRef=\"Activity_0r7h31h\" targetRef=\"Activity_13x6aoj\" />\n  </bpmn:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_Default\">\n      <bpmndi:BPMNEdge id=\"Flow_1mojh0z_di\" bpmnElement=\"Flow_1mojh0z\">\n        <di:waypoint x=\"550\" y=\"270\" />\n        <di:waypoint x=\"600\" y=\"270\" />\n      </bpmndi:BPMNEdge>\n      <bpmndi:BPMNShape id=\"Activity_0r7h31h_di\" bpmnElement=\"Activity_0r7h31h\">\n        <dc:Bounds x=\"450\" y=\"230\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n      <bpmndi:BPMNShape id=\"Activity_13x6aoj_di\" bpmnElement=\"Activity_13x6aoj\">\n        <dc:Bounds x=\"600\" y=\"230\" width=\"100\" height=\"80\" />\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn:definitions>\n";
    }
}
