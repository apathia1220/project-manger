import { Button, Card,Dropdown,Menu,Modal } from "antd";
import React from "react";
import { Kanban } from "type/kanban";
import { Task } from "type/task";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from "./utils";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Mark } from "components/mark";
import styled from "@emotion/styled";
import { CreateTask } from "./create-task";
import { useDeleteKanbans } from "utils/kanban";
import { Row } from "components/lib";

const TaskTypeIcon = ({ id }: { id: number }) => {
    // 获取所有的信息，并通过id进行对比，找到传入id对应的tasktype的name
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

const TaskCard = ({ task }: { task: Task }) => {
    const { name: keyword } = useTasksSearchParams();

    return (
        <Card style={{ marginBottom: "0.5rem", cursor: "pointer" }} key={task.id}>
            <p>
                <Mark name={task.name} keyword={keyword} />
            </p>
            <TaskTypeIcon id={task.typeId} />
        </Card>
    );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks()
    const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)
    const {startEdit} = useTasksModal()
    return <Container>
        <TasksContainer>
            <Row between={true}>
                <h3>{kanban.name}</h3>
                <More kanban={kanban}/>
            </Row>
            {
                tasks?.map(task => (
                    <div onClick={()=>startEdit(task.id)}>
                        <TaskCard task={task}></TaskCard>
                    </div>
                ))}
            <CreateTask kanbanId={kanban.id}/>
        </TasksContainer>
    </Container>
}

const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync} = useDeleteKanbans(useKanbansQueryKey())
    const startEdit = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除看板吗',
            onOk() {
                return mutateAsync({id:kanban.id})
            }
        })
    }
    const overlay = <Menu>
        <Menu.Item>
            <Button type="link" onClick={startEdit}>
                删除
            </Button>
        </Menu.Item>
    </Menu>

    return <Dropdown overlay={overlay}>
        <Button type="link">...</Button>
    </Dropdown>
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;