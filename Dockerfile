# 使用 node:latest 作为基础镜像
FROM node:latest
# 设置工作目录
WORKDIR /app

# 复制项目文件到工作目录
COPY . .

# 安装 pnpm
RUN npm install -g @pnpm/exe
# RUN pnpm config set registry https://registry.npmmirror.com

# 暴露应用端口
EXPOSE 5173

# 默认命令
CMD ["bash", "-c", "pnpm install && pnpm run dev"]
