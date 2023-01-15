import { Box, Container, Tab, Tabs } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import { useEffect, useState, ReactHTMLElement } from "react";
import { useParams } from "react-router-dom";
import { Lawsuit } from "../types/types";
import http from "../utils/http-common";
import DetailHeader from "../components/detailHeader";
import LawsuitResume from "../components/lawsuitResume";
import InvolvedContent from "../components/involvedContent";
import GeneralInfoContent from "../components/generalInfoContent";
import LawsuitTimelineContent from "../components/lawsuitTimelineContent";

function Detail() {
  const { lawsuitId } = useParams();
  const [lawsuit, setLawsuit] = useState({} as Lawsuit);

  const lawsuitTabs = {
    timeLine: <LawsuitTimelineContent
    events={lawsuit.events}/>,
    generalInfo: <GeneralInfoContent
    amountInControversy={lawsuit.amountInControversy}
    court={lawsuit.Court}
    initDate={lawsuit.initDate}
    judicialBranch={lawsuit.judicialBranch}
    nature={lawsuit.nature}
    subjects={lawsuit.subjects}
    />,
    involved: <InvolvedContent involved={lawsuit.Involved} />,
  } as const;

  type lawsuitTabsKeys = keyof typeof lawsuitTabs;


  const [currentTab, setCurrentTab] = useState("timeLine" as lawsuitTabsKeys);

  const handleChange = (_: any, newCurrentTab: lawsuitTabsKeys) => {
    setCurrentTab(newCurrentTab);
  };

  const fetchData = async () => {
    const result = (await http.get(`lawsuit/${lawsuitId}`)).data;
    console.log(result)
    setLawsuit(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!lawsuit.id) {
    return (
      <div>Loading</div>
    )
  }


  return (
    <Box
      style={{
        backgroundColor: "black",
        maxWidth: "600px",
        margin: "0 auto",
        height: "calc(100vh - 2px)",
        border: "solid 1px black",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <DetailHeader
        accused={lawsuit.Involved.acused}
        lawsuitId={lawsuitId as string}
      />
      <LawsuitResume
        amountInControversy={lawsuit.amountInControversy}
        court={lawsuit.Court}
        involved={lawsuit.Involved}
        nature={lawsuit.nature}
      />
      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        style={{
          backgroundColor: "blue",
        }}
      >
        <Tab value="timeLine" label="Linha do tempo" />
        <Tab value="generalInfo" label="Informações gerais" />
        <Tab value="involved" label="Envolvidos" />
      </Tabs>
      <Container maxWidth={"sm"} style={{
        height: "100%",
        backgroundColor: "white",
        flexGrow: 1,
        overflowY: "scroll"
      }}>
        {lawsuitTabs[currentTab as lawsuitTabsKeys]}
      </Container>
    </Box>
  );
}

export default Detail;
