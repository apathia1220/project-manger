import styled from "@emotion/styled"
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import { ErrorBox } from "components/lib"
import { UserSelect } from "components/user-select"
import React, { useEffect } from "react"
import { useAddEpic } from "utils/epic"
import { useEpicsQueryKey } from "./util"

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void}) => {
    const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey())
    const [form] = useForm()

    const onFinish = async (values: any) => {
        await addEpic(values)
        props.onClose()
    }

    useEffect(() => {
        form.resetFields()
    },[form, props.visible])

    return <Drawer
                visible={props.visible}
                onClose={props.onClose}
                forceRender={true}
                destroyOnClose={true}
                width={'100%'}
            >
        <Container>
            {isLoading ? (
            <Spin size={"large"} />
            ) : (
            <>
                <h1>创建任务组</h1>
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
                    rules={[{ required: true, message: "请输入任务组名" }]}
                >
                    <Input placeholder={"请输入任务组名称"} />
                </Form.Item>

                <Form.Item style={{ textAlign: "center" }}>
                    <Button
                    type={"primary"}
                    htmlType={"submit"}
                    loading={isLoading}
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;