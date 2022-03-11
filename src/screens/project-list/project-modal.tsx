import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/user-select'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAddProject, useDeleteProject, useEditProject } from 'utils/project'
import { projectListActions, selectProjectModalOpen } from './project-list.slice'
import { useProjectModal, useProjectQueryKey } from './util'

export const ProjectModal = () => {
    // const dispatch = useDispatch()
    // const projectModalOpen = useSelector(selectProjectModalOpen)
    // return <Drawer onClose={() => dispatch(projectListActions.closeProjectModal())} visible={projectModalOpen} width={'100 %'}>
    //     <h1>Project Modal</h1>
    //     <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    // </Drawer>
    
    const { modalOpen, close, isLoading, editingProject } = useProjectModal()
    const title = editingProject ? '编辑项目' : '创建项目' 
    const queryKey = useProjectQueryKey()
    const useMutateProject = editingProject ? useEditProject : useAddProject;
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(queryKey);

    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(closeModal);
    };

    const closeModal = () => {
        form.resetFields();
        close();
    };

    useEffect(() => {
      form.setFieldsValue(editingProject);
      // editingProject： 表示的是存储在query中的数据
    }, [editingProject, form]);
    return <Drawer forceRender={true} onClose={close} visible={modalOpen} width={'100 %'}>
        <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;