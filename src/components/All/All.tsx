import AutoComplete, { DataSourceType } from "../AutoComplete/AutoComplete";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import CircleLoader from "../CircleLoader/CircleLoader";
import ThreeDotsLoader from "../ThreeDotsLoader/ThreeDotsLoader";
import Input from "../Input/Input";
import List from "../List/List";
import ProgressBar from "../ProgressBar/ProgressBar";
import Pagination from "../Pagination/Pagination";
import { SideBars, SideBarsItem, SideBarsGroup } from "../SideBars";
import PaginationSpread from "../PaginationSpread/PaginationSpread";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faGear,
  faChartSimple,
  faChartPie,
  faCalendarDays,
  faNewspaper,
  faBookBookmark,
  faDiagramProject,
  faAtom,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab, TabsList, TabsPanel, TabsPanels } from "../Tabs";

const fakeData = [
  {
    value: "$64.50",
    name: 1,
  },
  {
    value: "$24.43",
    name: 2,
  },
  {
    value: "$18.07",
    name: 3,
  },
  {
    value: "$34.40",
    name: 4,
  },
  {
    value: "$39.08",
    name: 5,
  },
];

const All = () => {
  return (
    <div>
      <div className="flex gap-5">
        <Alert type="success">Success notification</Alert>
        <Alert type="info">Info notification</Alert>
        <Alert type="alert">Alert notification</Alert>
        <Alert type="warn">Wranning notification</Alert>
      </div>
      <div className="flex wrap gap-10 my-5">
        <div className="flex flex-col gap-10">
          <div className="flex gap-5">
            <CircleLoader />
            <ThreeDotsLoader />
          </div>
          <Pagination currentPage={1} totalPage={5} />
          <PaginationSpread currentPage={1} totalPage={5} />
        </div>
        <div>
          <List
            loading={false}
            data={[
              {
                value: "第1個highlight",
              },
              {
                value: "第2個",
              },
              {
                value: "第3個active",
              },
              {
                value: "第4個",
              },
            ]}
            highlightIndex={0}
            defaultIndex={2}
          />
        </div>
        <div className="flex flex-col gap-10 flex-1">
          <div className="flex gap-3">
            <ProgressBar percents={50} />
            <ProgressBar percents={50} isShowText />
          </div>
          <div className="flex gap-3">
            <ProgressBar percents={50} varients="style2" />
            <ProgressBar percents={50} varients="style2" isShowText />
          </div>
          <div className="flex flex-col gap-3">
            <Tabs defaultIndex={0}>
              <TabsList>
                <Tab>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faDiagramProject} size="sm" />
                    Tab name
                  </div>
                </Tab>
                <Tab>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faDiagramProject} size="sm" />
                    Tab name
                  </div>
                </Tab>
              </TabsList>
            </Tabs>
            <Tabs size="lg" defaultIndex={1}>
              <TabsList>
                <Tab>Tab name</Tab>
                <Tab>Tab name</Tab>
                <Tab disabled>Tab name</Tab>
              </TabsList>
              <TabsPanels>
                <TabsPanel>
                  <div className="bg-styleColors-lightBlue">111</div>
                </TabsPanel>
                <TabsPanel>
                  <div className="bg-styleColors-lightBlue">222</div>
                </TabsPanel>
                <TabsPanel>
                  <div className="bg-styleColors-lightBlue">333</div>
                </TabsPanel>
              </TabsPanels>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="flex gap-10 wrap">
        <div className="">
          <div className="flex gap-10 mb-2.5">
            <Button>Download</Button>
            <Button variants="style2">Download</Button>
            <Button variants="style3">Download</Button>
            <Button variants="style4">Download</Button>
          </div>
          <div className="flex gap-10 mb-2.5">
            <Button disabled>Download</Button>
            <Button disabled variants="style2">
              Download
            </Button>
            <Button disabled variants="style3">
              Download
            </Button>
            <Button disabled variants="style4">
              Download
            </Button>
          </div>
          <div className="flex gap-5 mb-2.5">
            <Button size="lg">Download</Button>
            <Button size="lg" variants="style2">
              Download
            </Button>
            <Button size="lg" variants="style3">
              Download
            </Button>
            <Button size="lg" variants="style4">
              Download
            </Button>
          </div>
          <div className="flex gap-5 mb-2.5">
            <Button disabled size="lg">
              Download
            </Button>
            <Button disabled size="lg" variants="style2">
              Download
            </Button>
            <Button disabled size="lg" variants="style3">
              Download
            </Button>
            <Button disabled size="lg" variants="style4">
              Download
            </Button>
          </div>
          <div className="flex gap-5 mb-2.5">
            <div className="flex items-center">
              <Button combined="left">
                <FontAwesomeIcon size="lg" icon={faAngleLeft} />
                <p style={{ marginLeft: "14px", display: "inline-block" }}>
                  Back
                </p>
              </Button>
              <Button combined="right" variants="style4">
                <p style={{ marginRight: "14px", display: "inline-block" }}>
                  Next
                </p>
                <FontAwesomeIcon size="lg" icon={faAngleRight} />
              </Button>
            </div>
            <div>
              <Button combined="left">Back</Button>
              <Button combined="right" variants="style4">
                Next
              </Button>
            </div>
            <div className="flex items-center">
              <Button combined="left">
                <FontAwesomeIcon size="lg" icon={faAngleLeft} />
              </Button>
              <Button combined="right" variants="style3">
                <FontAwesomeIcon size="lg" icon={faAngleRight} />
              </Button>
            </div>
            <Button>
              <FontAwesomeIcon size="lg" icon={faGear} />
            </Button>
            <Button variants="style4">
              <FontAwesomeIcon size="lg" icon={faGear} />
            </Button>
          </div>
          <div className="flex gap-5">
            <div className="flex items-center">
              <Button disabled combined="left">
                <FontAwesomeIcon size="lg" icon={faAngleLeft} />
                <p style={{ marginLeft: "14px", display: "inline-block" }}>
                  Back
                </p>
              </Button>
              <Button disabled combined="right" variants="style4">
                <p style={{ marginRight: "14px", display: "inline-block" }}>
                  Next
                </p>
                <FontAwesomeIcon size="lg" icon={faAngleRight} />
              </Button>
            </div>
            <div>
              <Button disabled combined="left">
                Back
              </Button>
              <Button disabled combined="right" variants="style4">
                Next
              </Button>
            </div>
            <div className="flex items-center">
              <Button disabled combined="left">
                <FontAwesomeIcon size="lg" icon={faAngleLeft} />
              </Button>
              <Button disabled combined="right" variants="style3">
                <FontAwesomeIcon size="lg" icon={faAngleRight} />
              </Button>
            </div>
            <Button disabled>
              <FontAwesomeIcon size="lg" icon={faGear} />
            </Button>
            <Button disabled variants="style4">
              <FontAwesomeIcon size="lg" icon={faGear} />
            </Button>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex gap-2 flex-col">
            <Input />
            <Input label="Email" defaultValue="disabled" disabled />
            <Input label="Email" defaultValue="defaultValue" />
            <Input errorText="errorText" />
            <Input block defaultValue="block 100%" />
          </div>
          <div className="flex gap-2 flex-col">
            <Input size="lg" />
            <Input size="lg" label="Email" defaultValue="disabled" disabled />
            <Input size="lg" label="Email" defaultValue="defaultValue" />
            <Input size="lg" errorText="errorText" />
            <Input size="lg" block defaultValue="block 100%" />
          </div>
        </div>
      </div>
      <div className="my-10">
        <AutoComplete
          fetchFn={(query) =>
            fakeData.filter((i) => i.value.indexOf(query) > -1)
          }
          onSelect={() => {}}
          placeholder="搜尋任意數字"
        />
      </div>

      <div className="flex wrap gap-5">
        <div>
          <SideBars>
            <SideBarsGroup text="TOOLS">
              <SideBarsItem icon={<FontAwesomeIcon icon={faChartSimple} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faChartPie} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faCalendarDays} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faNewspaper} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faBookBookmark} />} />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faDiagramProject} />}
              />
              <SideBarsItem icon={<FontAwesomeIcon icon={faGear} />} />
            </SideBarsGroup>
          </SideBars>
        </div>
        <div>
          <SideBars size="lg">
            <SideBarsGroup text="TOOLS">
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faChartSimple} />}
                text="Dashboard"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faChartPie} />}
                text="Statistic"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faCalendarDays} />}
                text="Schedule"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faNewspaper} />}
                text="Reports"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faBookBookmark} />}
                text="Visitors"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faDiagramProject} />}
                text="Segements"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faGear} />}
                text="Setting"
              />
            </SideBarsGroup>
          </SideBars>
        </div>
        <div>
          <SideBars variants="style2">
            <SideBarsGroup text="TOOLS">
              <SideBarsItem icon={<FontAwesomeIcon icon={faChartSimple} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faChartPie} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faCalendarDays} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faNewspaper} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faBookBookmark} />} />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faDiagramProject} />}
              />
              <SideBarsItem icon={<FontAwesomeIcon icon={faGear} />} />
            </SideBarsGroup>
            <SideBarsGroup text="TOOLS">
              <SideBarsItem icon={<FontAwesomeIcon icon={faAtom} />} />
              <SideBarsItem icon={<FontAwesomeIcon icon={faBell} />} />
            </SideBarsGroup>
          </SideBars>
        </div>
        <div>
          <SideBars variants="style2" size="lg">
            <SideBarsGroup text="TOOLS">
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faChartSimple} />}
                text="Dashboard"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faChartPie} />}
                text="Statistic"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faCalendarDays} />}
                text="Schedule"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faNewspaper} />}
                text="Reports"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faBookBookmark} />}
                text="Visitors"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faDiagramProject} />}
                text="Segements"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faGear} />}
                text="Setting"
              />
            </SideBarsGroup>
            <SideBarsGroup text="INDUSTRY">
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faAtom} />}
                text="Trading"
              />
              <SideBarsItem
                icon={<FontAwesomeIcon icon={faBell} />}
                text="Business"
              />
            </SideBarsGroup>
          </SideBars>
        </div>
        <div>
          <SideBars variants="style3">
            <SideBarsItem
              icon={<FontAwesomeIcon icon={faChartSimple} />}
              text="Dashboard"
            />
            <SideBarsItem
              icon={<FontAwesomeIcon icon={faChartPie} />}
              text="Statistic"
            />
            <SideBarsItem
              icon={<FontAwesomeIcon icon={faCalendarDays} />}
              text="Schedule"
            />
            <SideBarsItem
              icon={<FontAwesomeIcon icon={faNewspaper} />}
              text="Reports"
            />
            <SideBarsItem
              icon={<FontAwesomeIcon icon={faGear} />}
              text="Setting"
            />
          </SideBars>
        </div>
        <div>
          <SideBars variants="style3" size="lg">
            <SideBarsGroup text="TOOLS" toggleable defaultOpen>
              <SideBarsItem text="Dashboard" />
              <SideBarsItem text="Statistic" />
              <SideBarsItem text="Schedule" />
            </SideBarsGroup>
            <SideBarsGroup text="TOOLS" toggleable>
              <SideBarsItem text="Reports" />
              <SideBarsItem text="Visitors" />
              <SideBarsItem text="Segements" />
              <SideBarsItem text="Setting" />
            </SideBarsGroup>
          </SideBars>
        </div>
      </div>
    </div>
  );
};

export default All;
