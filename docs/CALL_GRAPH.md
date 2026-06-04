# Call Graph

调用图只展示能够唯一匹配到仓库内部方法单元的调用表达式。

```mermaid
flowchart TD
  N0_A["analyzeRepo"]
  N0_B["attachHeuristicSemantics"]
  N0_A --> N0_B
  N1_A["analyzeRepo"]
  N1_B["buildRelationGraph"]
  N1_A --> N1_B
  N2_A["analyzeRepo"]
  N2_B["enrichModulesWithMethodSemantics"]
  N2_A --> N2_B
  N3_A["analyzeRepo"]
  N3_B["loadModelConfig"]
  N3_A --> N3_B
  N4_A["analyzeRepo"]
  N4_B["parseModules"]
  N4_A --> N4_B
  N5_A["analyzeRepo"]
  N5_B["scanRepo"]
  N5_A --> N5_B
  N6_A["analyzeRepo"]
  N6_B["toModelRuntimeInfo"]
  N6_A --> N6_B
  N7_A["buildRelationGraph"]
  N7_B["buildMethodNameIndex"]
  N7_A --> N7_B
  N8_A["buildRelationGraph"]
  N8_B["dedupeEdges"]
  N8_A --> N8_B
  N9_A["buildRelationGraph"]
  N9_B["resolveCallTarget"]
  N9_A --> N9_B
  N10_A["buildRelationGraph"]
  N10_B["scoreCall"]
  N10_A --> N10_B
  N11_A["buildRelationGraph"]
  N11_B["stableId"]
  N11_A --> N11_B
  N12_A["extractResources"]
  N12_B["resourceKind"]
  N12_A --> N12_B
  N13_A["extractResources"]
  N13_B["stableId"]
  N13_A --> N13_B
  N14_A["main"]
  N14_B["analyzeRepo"]
  N14_A --> N14_B
  N15_A["main"]
  N15_B["parseArgs"]
  N15_A --> N15_B
  N16_A["main"]
  N16_B["printHelp"]
  N16_A --> N16_B
  N17_A["parseArgs"]
  N17_B["loadModelConfig"]
  N17_A --> N17_B
  N18_A["parseArgs"]
  N18_B["requireValue"]
  N18_A --> N18_B
  N19_A["enrichModulesWithMethodSemantics"]
  N19_B["MethodSemanticCache#open"]
  N19_A --> N19_B
  N20_A["enrichModulesWithMethodSemantics"]
  N20_B["analyzeMethodWithLlm"]
  N20_A --> N20_B
  N21_A["enrichModulesWithMethodSemantics"]
  N21_B["createChatModel"]
  N21_A --> N21_B
  N22_A["enrichModulesWithMethodSemantics"]
  N22_B["formatError"]
  N22_A --> N22_B
  N23_A["enrichModulesWithMethodSemantics"]
  N23_B["heuristicSemantic"]
  N23_A --> N23_B
  N24_A["enrichModulesWithMethodSemantics"]
  N24_B["mapWithConcurrency"]
  N24_A --> N24_B
  N25_A["enrichModulesWithMethodSemantics"]
  N25_B["summarizeModuleFromMethods"]
  N25_A --> N25_B
  N26_A["attachHeuristicSemantics"]
  N26_B["heuristicSemantic"]
  N26_A --> N26_B
  N27_A["analyzeMethodWithLlm"]
  N27_B["buildPrompt"]
  N27_A --> N27_B
  N28_A["analyzeMethodWithLlm"]
  N28_B["parseModelResponse"]
  N28_A --> N28_B
  N29_A["parseModelResponse"]
  N29_B["extractContent"]
  N29_A --> N29_B
  N30_A["parseModelResponse"]
  N30_B["extractJsonObject"]
  N30_A --> N30_B
  N31_A["parseModelResponse"]
  N31_B["normalizeSemantic"]
  N31_A --> N31_B
  N32_A["buildPrompt"]
  N32_B["trimSource"]
  N32_A --> N32_B
  N33_A["cacheKey"]
  N33_B["hash"]
  N33_A --> N33_B
  N34_A["MethodSemanticCache#get"]
  N34_B["cacheKey"]
  N34_A --> N34_B
  N35_A["MethodSemanticCache#set"]
  N35_B["cacheKey"]
  N35_A --> N35_B
  N36_A["MethodSemanticCache#load"]
  N36_B["isMissingFile"]
  N36_A --> N36_B
  N37_A["loadModelConfig"]
  N37_B["defaultBaseUrl"]
  N37_A --> N37_B
  N38_A["loadModelConfig"]
  N38_B["defaultModel"]
  N38_A --> N38_B
  N39_A["loadModelConfig"]
  N39_B["getApiKey"]
  N39_A --> N39_B
  N40_A["loadModelConfig"]
  N40_B["parseInteger"]
  N40_A --> N40_B
  N41_A["loadModelConfig"]
  N41_B["parseNumber"]
  N41_A --> N41_B
  N42_A["loadModelConfig"]
  N42_B["parseOptionalInteger"]
  N42_A --> N42_B
  N43_A["parseJavaModule"]
  N43_B["buildLineIndex"]
  N43_A --> N43_B
  N44_A["parseJavaModule"]
  N44_B["extractClassBlocks"]
  N44_A --> N44_B
  N45_A["parseJavaModule"]
  N45_B["maskJavaSource"]
  N45_A --> N45_B
  N46_A["parseJavaModule"]
  N46_B["stableId"]
  N46_A --> N46_B
  N47_A["extractClassBlocks"]
  N47_B["findMatchingBrace"]
  N47_A --> N47_B
  N48_A["extractClassUnit"]
  N48_B["buildMethodUnit"]
  N48_A --> N48_B
  N49_A["extractClassUnit"]
  N49_B["extractMethodBlocks"]
  N49_A --> N49_B
  N50_A["extractClassUnit"]
  N50_B["locationFromOffsets"]
  N50_A --> N50_B
  N51_A["extractClassUnit"]
  N51_B["requestMappingPath"]
  N51_A --> N51_B
  N52_A["extractClassUnit"]
  N52_B["stableId"]
  N52_A --> N52_B
  N53_A["extractMethodBlocks"]
  N53_B["findMatchingBrace"]
  N53_A --> N53_B
  N54_A["extractMethodBlocks"]
  N54_B["leadingWhitespaceLength"]
  N54_A --> N54_B
  N55_A["extractMethodBlocks"]
  N55_B["parseMethodHeader"]
  N55_A --> N55_B
  N56_A["parseMethodHeader"]
  N56_B["parseParameters"]
  N56_A --> N56_B
  N57_A["parseMethodHeader"]
  N57_B["stripAnnotations"]
  N57_A --> N57_B
  N58_A["buildMethodUnit"]
  N58_B["locationFromOffsets"]
  N58_A --> N58_B
  N59_A["buildMethodUnit"]
  N59_B["stableId"]
  N59_A --> N59_B
  N60_A["extractResources"]
  N60_B["extractStringLiterals"]
  N60_A --> N60_B
  N61_A["extractFrameworkHints"]
  N61_B["annotationAttribute"]
  N61_A --> N61_B
  N62_A["extractFrameworkHints"]
  N62_B["annotationByName"]
  N62_A --> N62_B
  N63_A["extractFrameworkHints"]
  N63_B["firstAnnotationString"]
  N63_A --> N63_B
  N64_A["extractFrameworkHints"]
  N64_B["hasAnnotation"]
  N64_A --> N64_B
  N65_A["extractFrameworkHints"]
  N65_B["routeFromAnnotations"]
  N65_A --> N65_B
  N66_A["extractEntrypointHints"]
  N66_B["hasAnnotation"]
  N66_A --> N66_B
  N67_A["routeFromAnnotations"]
  N67_B["annotationAttribute"]
  N67_A --> N67_B
  N68_A["routeFromAnnotations"]
  N68_B["annotationName"]
  N68_A --> N68_B
  N69_A["routeFromAnnotations"]
  N69_B["firstAnnotationString"]
  N69_A --> N69_B
  N70_A["routeFromAnnotations"]
  N70_B["joinRoutePaths"]
  N70_A --> N70_B
  N71_A["routeFromAnnotations"]
  N71_B["requestMappingMethod"]
  N71_A --> N71_B
  N72_A["requestMappingPath"]
  N72_B["annotationAttribute"]
  N72_A --> N72_B
  N73_A["requestMappingPath"]
  N73_B["annotationName"]
  N73_A --> N73_B
  N74_A["requestMappingPath"]
  N74_B["firstAnnotationString"]
  N74_A --> N74_B
  N75_A["parseParameters"]
  N75_B["splitTopLevel"]
  N75_A --> N75_B
  N76_A["parseParameters"]
  N76_B["stripAnnotations"]
  N76_A --> N76_B
  N77_A["hasAnnotation"]
  N77_B["annotationName"]
  N77_A --> N77_B
  N78_A["annotationByName"]
  N78_B["annotationName"]
  N78_A --> N78_B
  N79_A["locationFromOffsets"]
  N79_B["lineNumberAt"]
  N79_A --> N79_B
  N80_A["parseModules"]
  N80_B["findParserAdapter"]
  N80_A --> N80_B
  N81_A["parseModules"]
  N81_B["stableId"]
  N81_A --> N81_B
  N82_A["parseTypeScriptModule"]
  N82_B["extractFunctionUnit"]
  N82_A --> N82_B
  N83_A["parseTypeScriptModule"]
  N83_B["extractVariableFunctionUnit"]
  N83_A --> N83_B
  N84_A["parseTypeScriptModule"]
  N84_B["stableId"]
  N84_A --> N84_B
  N85_A["parseTypeScriptModule"]
  N85_B["summarizeModule"]
  N85_A --> N85_B
  N86_A["extractClassUnit"]
  N86_B["extractCallableUnit"]
  N86_A --> N86_B
  N87_A["extractClassUnit"]
  N87_B["getLocation"]
  N87_A --> N87_B
  N88_A["extractClassUnit"]
  N88_B["stableId"]
  N88_A --> N88_B
  N89_A["extractFunctionUnit"]
  N89_B["extractCallableUnit"]
  N89_A --> N89_B
  N90_A["extractVariableFunctionUnit"]
  N90_B["extractCallableUnit"]
  N90_A --> N90_B
  N91_A["extractCallableUnit"]
  N91_B["buildSignature"]
  N91_A --> N91_B
  N92_A["extractCallableUnit"]
  N92_B["extractParameters"]
  N92_A --> N92_B
  N93_A["extractCallableUnit"]
  N93_B["getLocation"]
  N93_A --> N93_B
  N94_A["extractCallableUnit"]
  N94_B["hasModifier"]
  N94_A --> N94_B
  N95_A["extractCallableUnit"]
  N95_B["stableId"]
  N95_A --> N95_B
  N96_A["extractVisibility"]
  N96_B["hasModifier"]
  N96_A --> N96_B
  N97_A["extractCalls"]
  N97_B["formatCallExpression"]
  N97_A --> N97_B
  N98_A["extractFrameworkHints"]
  N98_B["literalText"]
  N98_A --> N98_B
  N99_A["extractFrameworkHints"]
  N99_B["parseHttpRouteCall"]
  N99_A --> N99_B
  N100_A["extractEntrypointHints"]
  N100_B["parseHttpRouteCall"]
  N100_A --> N100_B
  N101_A["parseHttpRouteCall"]
  N101_B["literalText"]
  N101_A --> N101_B
  N102_A["scanRepo"]
  N102_B["detectLanguage"]
  N102_A --> N102_B
  N103_A["scanRepo"]
  N103_B["toPosixPath"]
  N103_A --> N103_B
```

## Edges

| From | To | Call | Weight |
| --- | --- | --- | --- |
| analyzeRepo | attachHeuristicSemantics | attachHeuristicSemantics | 1 |
| analyzeRepo | buildRelationGraph | buildRelationGraph | 1 |
| analyzeRepo | enrichModulesWithMethodSemantics | enrichModulesWithMethodSemantics | 1 |
| analyzeRepo | loadModelConfig | loadModelConfig | 1 |
| analyzeRepo | parseModules | parseModules | 1 |
| analyzeRepo | scanRepo | scanRepo | 1 |
| analyzeRepo | toModelRuntimeInfo | toModelRuntimeInfo | 1 |
| buildRelationGraph | buildMethodNameIndex | buildMethodNameIndex | 1 |
| buildRelationGraph | dedupeEdges | dedupeEdges | 1 |
| buildRelationGraph | resolveCallTarget | resolveCallTarget | 1 |
| buildRelationGraph | scoreCall | scoreCall | 1 |
| buildRelationGraph | stableId | stableId | 1 |
| extractResources | resourceKind | resourceKind | 1 |
| extractResources | stableId | stableId | 1 |
| main | analyzeRepo | analyzeRepo | 1 |
| main | parseArgs | parseArgs | 1 |
| main | printHelp | printHelp | 1 |
| parseArgs | loadModelConfig | loadModelConfig | 1 |
| parseArgs | requireValue | requireValue | 1 |
| enrichModulesWithMethodSemantics | MethodSemanticCache#open | MethodSemanticCache.open | 1 |
| enrichModulesWithMethodSemantics | analyzeMethodWithLlm | analyzeMethodWithLlm | 1 |
| enrichModulesWithMethodSemantics | createChatModel | createChatModel | 3 |
| enrichModulesWithMethodSemantics | formatError | formatError | 1 |
| enrichModulesWithMethodSemantics | heuristicSemantic | heuristicSemantic | 1 |
| enrichModulesWithMethodSemantics | mapWithConcurrency | mapWithConcurrency | 1 |
| enrichModulesWithMethodSemantics | summarizeModuleFromMethods | summarizeModuleFromMethods | 1 |
| attachHeuristicSemantics | heuristicSemantic | heuristicSemantic | 1 |
| analyzeMethodWithLlm | buildPrompt | buildPrompt | 1 |
| analyzeMethodWithLlm | parseModelResponse | parseModelResponse | 1 |
| parseModelResponse | extractContent | extractContent | 1 |
| parseModelResponse | extractJsonObject | extractJsonObject | 1 |
| parseModelResponse | normalizeSemantic | normalizeSemantic | 1 |
| buildPrompt | trimSource | trimSource | 1 |
| cacheKey | hash | hash | 1 |
| MethodSemanticCache#get | cacheKey | cacheKey | 1 |
| MethodSemanticCache#set | cacheKey | cacheKey | 1 |
| MethodSemanticCache#load | isMissingFile | isMissingFile | 1 |
| loadModelConfig | defaultBaseUrl | defaultBaseUrl | 1 |
| loadModelConfig | defaultModel | defaultModel | 1 |
| loadModelConfig | getApiKey | getApiKey | 1 |
| loadModelConfig | parseInteger | parseInteger | 1 |
| loadModelConfig | parseNumber | parseNumber | 1 |
| loadModelConfig | parseOptionalInteger | parseOptionalInteger | 1 |
| parseJavaModule | buildLineIndex | buildLineIndex | 1 |
| parseJavaModule | extractClassBlocks | extractClassBlocks | 1 |
| parseJavaModule | maskJavaSource | maskJavaSource | 1 |
| parseJavaModule | stableId | stableId | 1 |
| extractClassBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractClassUnit | buildMethodUnit | buildMethodUnit | 1 |
| extractClassUnit | extractMethodBlocks | extractMethodBlocks | 1 |
| extractClassUnit | locationFromOffsets | locationFromOffsets | 1 |
| extractClassUnit | requestMappingPath | requestMappingPath | 1 |
| extractClassUnit | stableId | stableId | 1 |
| extractMethodBlocks | findMatchingBrace | findMatchingBrace | 1 |
| extractMethodBlocks | leadingWhitespaceLength | leadingWhitespaceLength | 1 |
| extractMethodBlocks | parseMethodHeader | parseMethodHeader | 1 |
| parseMethodHeader | parseParameters | parseParameters | 1 |
| parseMethodHeader | stripAnnotations | stripAnnotations | 1 |
| buildMethodUnit | locationFromOffsets | locationFromOffsets | 1 |
| buildMethodUnit | stableId | stableId | 1 |
| extractResources | extractStringLiterals | extractStringLiterals | 1 |
| extractFrameworkHints | annotationAttribute | annotationAttribute | 1 |
| extractFrameworkHints | annotationByName | annotationByName | 1 |
| extractFrameworkHints | firstAnnotationString | firstAnnotationString | 1 |
| extractFrameworkHints | hasAnnotation | hasAnnotation | 1 |
| extractFrameworkHints | routeFromAnnotations | routeFromAnnotations | 1 |
| extractEntrypointHints | hasAnnotation | hasAnnotation | 1 |
| routeFromAnnotations | annotationAttribute | annotationAttribute | 1 |
| routeFromAnnotations | annotationName | annotationName | 1 |
| routeFromAnnotations | firstAnnotationString | firstAnnotationString | 1 |
| routeFromAnnotations | joinRoutePaths | joinRoutePaths | 1 |
| routeFromAnnotations | requestMappingMethod | requestMappingMethod | 1 |
| requestMappingPath | annotationAttribute | annotationAttribute | 1 |
| requestMappingPath | annotationName | annotationName | 1 |
| requestMappingPath | firstAnnotationString | firstAnnotationString | 1 |
| parseParameters | splitTopLevel | splitTopLevel | 1 |
| parseParameters | stripAnnotations | stripAnnotations | 1 |
| hasAnnotation | annotationName | annotationName | 1 |
| annotationByName | annotationName | annotationName | 1 |
| locationFromOffsets | lineNumberAt | lineNumberAt | 1 |
| parseModules | findParserAdapter | findParserAdapter | 1 |
| parseModules | stableId | stableId | 1 |
| parseTypeScriptModule | extractFunctionUnit | extractFunctionUnit | 1 |
| parseTypeScriptModule | extractVariableFunctionUnit | extractVariableFunctionUnit | 1 |
| parseTypeScriptModule | stableId | stableId | 1 |
| parseTypeScriptModule | summarizeModule | summarizeModule | 1 |
| extractClassUnit | extractCallableUnit | extractCallableUnit | 1 |
| extractClassUnit | getLocation | getLocation | 1 |
| extractClassUnit | stableId | stableId | 1 |
| extractFunctionUnit | extractCallableUnit | extractCallableUnit | 1 |
| extractVariableFunctionUnit | extractCallableUnit | extractCallableUnit | 1 |
| extractCallableUnit | buildSignature | buildSignature | 1 |
| extractCallableUnit | extractParameters | extractParameters | 1 |
| extractCallableUnit | getLocation | getLocation | 1 |
| extractCallableUnit | hasModifier | hasModifier | 1 |
| extractCallableUnit | stableId | stableId | 1 |
| extractVisibility | hasModifier | hasModifier | 1 |
| extractCalls | formatCallExpression | formatCallExpression | 1 |
| extractFrameworkHints | literalText | literalText | 1 |
| extractFrameworkHints | parseHttpRouteCall | parseHttpRouteCall | 1 |
| extractEntrypointHints | parseHttpRouteCall | parseHttpRouteCall | 1 |
| parseHttpRouteCall | literalText | literalText | 1 |
| scanRepo | detectLanguage | detectLanguage | 1 |
| scanRepo | toPosixPath | toPosixPath | 1 |
