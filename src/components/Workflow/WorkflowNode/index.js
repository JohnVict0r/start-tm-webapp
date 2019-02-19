import React from 'react';
import { Card, Icon, Popconfirm, Tag, Button, List } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

import styles from './index.less';

const WorkflowNode = ({
  index,
  node: { id, name, status, canCreateCard, transitions = [] },
  onAddTransation,
  onDeleteTransition,
  onEdit,
  onDelete,
}) => (
  <Draggable key={id} draggableId={id} index={index}>
    {(provided, snapshot) => (
      <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
        {style => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={style}
          >
            <Card
              className={styles.column}
              style={{ width: 300 }}
              title={name}
              type="inner"
              extra={<Tag color={status.color}>{status.displayName}</Tag>}
              actions={[
                <Icon type="edit" onClick={onEdit} />,
                <Popconfirm
                  title="Tem certeza?"
                  icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                  onConfirm={onDelete}
                >
                  <Icon type="delete" />
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                description={
                  <List>
                    <List.Item>
                      <List.Item.Meta description="Permitido criar tarefas?" />
                      <div>{canCreateCard ? 'sim' : 'não'}</div>
                    </List.Item>
                  </List>
                }
              />
              <div>
                <List
                  size="small"
                  dataSource={transitions}
                  renderItem={transition => (
                    <List.Item
                      key={transition.id}
                      actions={[
                        <Icon type="close" onClick={() => onDeleteTransition(transition.id)} />,
                      ]}
                    >
                      <div>
                        <Icon type="arrow-right" /> {transition.name}
                      </div>
                    </List.Item>
                  )}
                />
                <div className={styles.addTransition}>
                  <Button onClick={onAddTransation}>
                    <Icon type="branches" style={{ transform: 'rotate(90deg)' }} />
                    Adicionar Transição
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </NaturalDragAnimation>
    )}
  </Draggable>
);

export default WorkflowNode;
