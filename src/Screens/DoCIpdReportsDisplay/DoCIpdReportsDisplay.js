import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function LabReportTable() {
    const data = [
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001853",
            "LabParamLocalName": "TLC(TOTAL LEUCOCYTE COUNT",
            "LabParamFinalResult": "4.4",
            "unit": "thousand/cumm",
            "method": "(Flow Cytometry)",
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "4.00",
            "RefRangeHighLimit": "11.00",
            "RefRangeLimitInText": "4 - 11",
            "RefRangeCriticalLowLimit": "1.00",
            "RefRangeCriticalHighLimit": "50.00",
            "RefRangeCriticalRangeInText": "1 - 50"
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001846",
            "LabParamLocalName": "RBC COUNT (RED BLOOD CELL",
            "LabParamFinalResult": "3.7",
            "unit": "million/cumm",
            "method": "(Hydro Dynamic Focussing)",
            "LabParamHLFlagACode": "L",
            "RefRangeLowLimit": "4.50",
            "RefRangeHighLimit": "5.50",
            "RefRangeLimitInText": "4.5 - 5.5",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001826",
            "LabParamLocalName": "HAEMOGLOBIN (HB)",
            "LabParamFinalResult": "10.4",
            "unit": "g/dL",
            "method": "(SLS Hb Detection)",
            "LabParamHLFlagACode": "L",
            "RefRangeLowLimit": "13.00",
            "RefRangeHighLimit": "17.00",
            "RefRangeLimitInText": "13 - 17",
            "RefRangeCriticalLowLimit": "7.00",
            "RefRangeCriticalHighLimit": "20.00",
            "RefRangeCriticalRangeInText": "7 - 20"
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001842",
            "LabParamLocalName": "PCV (PACK CELL VOLUME)",
            "LabParamFinalResult": "35.1",
            "unit": "%",
            "method": "(Cumulative Pulse Height Detection)",
            "LabParamHLFlagACode": "L",
            "RefRangeLowLimit": "40.00",
            "RefRangeHighLimit": "50.00",
            "RefRangeLimitInText": "40 - 50",
            "RefRangeCriticalLowLimit": "5.00",
            "RefRangeCriticalHighLimit": "60.00",
            "RefRangeCriticalRangeInText": "5 - 60"
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001835",
            "LabParamLocalName": "MCV (MEAN CORPUSCULAR VOL",
            "LabParamFinalResult": "93.9",
            "unit": "fL",
            "method": null,
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "83.00",
            "RefRangeHighLimit": "101.00",
            "RefRangeLimitInText": "83 - 101",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001833",
            "LabParamLocalName": "MCH (MEAN CORPUSCULAR HAE",
            "LabParamFinalResult": "27.8",
            "unit": "pg",
            "method": null,
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "27.00",
            "RefRangeHighLimit": "32.00",
            "RefRangeLimitInText": "27 - 32",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001834",
            "LabParamLocalName": "MCHC(MEAN CORPUSCULAR HAE",
            "LabParamFinalResult": "29.6",
            "unit": "g/dL",
            "method": null,
            "LabParamHLFlagACode": "L",
            "RefRangeLowLimit": "31.50",
            "RefRangeHighLimit": "34.50",
            "RefRangeLimitInText": "31.5 - 34.5",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001844",
            "LabParamLocalName": "PLATELET COUNT",
            "LabParamFinalResult": "169",
            "unit": "thousand/cumm",
            "method": "(Hydro Dynamic Focussing)",
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "150.00",
            "RefRangeHighLimit": "400.00",
            "RefRangeLimitInText": "150 - 400",
            "RefRangeCriticalLowLimit": "20.00",
            "RefRangeCriticalHighLimit": "600.00",
            "RefRangeCriticalRangeInText": "20 - 600"
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001849",
            "LabParamLocalName": "RED CELL DISTRIBUTION WID",
            "LabParamFinalResult": "43.7",
            "unit": "fL",
            "method": "(Particle Size Distribution)",
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "39.00",
            "RefRangeHighLimit": "46.00",
            "RefRangeLimitInText": "39 -  46",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001847",
            "LabParamLocalName": "RED CELL DISTRIBUTION WID",
            "LabParamFinalResult": "12.7",
            "unit": "%",
            "method": null,
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "11.60",
            "RefRangeHighLimit": "14.00",
            "RefRangeLimitInText": "11.6 -  14",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001840",
            "LabParamLocalName": "NEUTROPHILS (NEUT)",
            "LabParamFinalResult": "56",
            "unit": "%",
            "method": null,
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "40.00",
            "RefRangeHighLimit": "80.00",
            "RefRangeLimitInText": "40 -  80",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001830",
            "LabParamLocalName": "LYMPHOCYTES (LYMPH)",
            "LabParamFinalResult": "35",
            "unit": "%",
            "method": null,
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "20.00",
            "RefRangeHighLimit": "40.00",
            "RefRangeLimitInText": "20 -  40",
            "RefRangeCriticalLowLimit": null,
            "RefRangeCriticalHighLimit": null,
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001838",
            "LabParamLocalName": "MONOCYTES (MONO)",
            "LabParamFinalResult": "6",
            "unit": "%",
            "method": null,
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "2.00",
            "RefRangeHighLimit": "10.00",
            "RefRangeLimitInText": "2 - 10",
            "RefRangeCriticalLowLimit": ".00",
            "RefRangeCriticalHighLimit": ".00",
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001823",
            "LabParamLocalName": "EOSINOPHILS (EOS)",
            "LabParamFinalResult": "3",
            "unit": "%",
            "method": null,
            "LabParamHLFlagACode": "",
            "RefRangeLowLimit": "1.00",
            "RefRangeHighLimit": "5.00",
            "RefRangeLimitInText": "1 - 5",
            "RefRangeCriticalLowLimit": ".00",
            "RefRangeCriticalHighLimit": ".00",
            "RefRangeCriticalRangeInText": null
        },
        {
            "ServiceRqstNumber": "AFBWR230102680",
            "ServiceCode": "HMC003",
            "ServiceName": "CBC-1( COMPLETE BLOOD COUNT )",
            "LabParamCode": "PARAM00001820",
            "LabParamLocalName": "BASOPHILS",
            "LabParamFinalResult": "0",
            "unit": "%",
            "method": null,
            "LabParamHLFlagACode": null,
            "RefRangeLowLimit": ".00",
            "RefRangeHighLimit": "1.00",
            "RefRangeLimitInText": "0 - 1",
            "RefRangeCriticalLowLimit": ".00",
            "RefRangeCriticalHighLimit": ".00",
            "RefRangeCriticalRangeInText": null
        }

    ];

    return (
        <SafeAreaView>
            <DataTable style={{ marginHorizontal: 10 }}>
                <DataTable.Header style={{ backgroundColor: '#f2f2f2' }}>
                    <DataTable.Title style={{ fontSize: 16, fontWeight: 'bold' }}>Parameter</DataTable.Title>
                    <DataTable.Title style={{ fontSize: 16, fontWeight: 'bold' }}>Result</DataTable.Title>
                    <DataTable.Title style={{ fontSize: 16, fontWeight: 'bold' }}>Units</DataTable.Title>
                    <DataTable.Title style={{ fontSize: 16, fontWeight: 'bold' }}>Reference Range</DataTable.Title>
                </DataTable.Header>

                {data.map((item, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell style={{ fontSize: 14 }}>{item.LabParamLocalName}</DataTable.Cell>
                        <DataTable.Cell style={{ fontSize: 14 }}>{item.LabParamFinalResult}</DataTable.Cell>
                        <DataTable.Cell style={{ fontSize: 14 }}>{item.unit}</DataTable.Cell>
                        <DataTable.Cell style={{ fontSize: 14 }}>
                            {`${item.RefRangeLowLimit} - ${item.RefRangeHighLimit}`}
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </SafeAreaView>
    );
}