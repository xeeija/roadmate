FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base

# Install custom fonts
# RUN sed -i'.bak' 's/$/ contrib/' /etc/apt/sources.list
# RUN apt-get update; apt-get install -y ttf-mscorefonts-installer fontconfig libgdiplus
# COPY ../.fonts /root/.fonts/
# RUN fc-cache -f -v

WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["API/API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"
COPY . .
WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]
